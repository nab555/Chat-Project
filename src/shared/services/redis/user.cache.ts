import { BaseCache } from "@services/redis/base.cache";
import { IUserDocument } from "@user/interfaces/user.interface";
import Logger from "bunyan";
import { config } from "@root/config";
import { tryCatch } from "bullmq";
import { ServerError } from "@global/helpers/error-handler";

const log:Logger = config.createLogger('userCache');

export class UserCache extends BaseCache {

  constructor(){
    super('userCache');
  }

  public async saveUserToCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void>{
    const createdAt = new Date();

    const {
      _id,
      uId,
      username,
      email,
      avatarColor,
      blocked,
      blockedBy,
      postsCount,
      profilePicture,
      followersCount,
      followingCount,
      notifications,
      work,
      location,
      school,
      quote,
      bgImageId,
      bgImageVersion,
      social
    } = createdUser;

    const firstList: string[] = [
      '_id', `${_id}`,
      'uId', `${uId}`,
      'username', `${username}`,
      'email', `${email}`,
      'avatarColor', `${avatarColor}`,
      'createdAt', `${createdAt}`,
      'postsCount', `${postsCount}`
    ];

    const secondList: string[] = [
      'blocaked', JSON.stringify(blocked),
      'blockedBy', JSON.stringify(blockedBy),
      'profilePicture', JSON.stringify(profilePicture),
      'followersCount', JSON.stringify(followersCount),
      'followingCount', JSON.stringify(followingCount),
      'notifications', JSON.stringify(notifications),
    ];

    const thirdList: string[] = [
      'work', `${work}`,
      'location', `${location}`,
      'school', `${school}`,
      'quote', `${quote}`,
      'bgImageId', `${bgImageId}`,
      'bgImageVersion', `${bgImageVersion}`,
    ];

    const dataToSave: string[] = [...firstList, ...secondList, ...thirdList];

    try {
      if(!this.client.isOpen){
        await this.client.connect();
      }
      await this.client.ZADD('user', {score: parseInt(userUId,10), value: `${key}`});
      await this.client.HSET(`users:${key}`, dataToSave);

    } catch (error) {
      log.error(error);
      throw new ServerError('server error, try agian');

    }

  }


}
