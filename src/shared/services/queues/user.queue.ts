import { authWorker } from "@root/shared/workers/auth.worker";
import { userWorker } from "@root/shared/workers/user.worker";
import { BaseQueue } from "@services/queues/base.queue";


class UserQueue extends BaseQueue{
  constructor(){
    super('user queue');
    this.processJob('addUserToDB',5, userWorker.addUserToDB);
  }

  public addUserJob (name: string, data: any):void {

    this.addJob(name, data);

  }

}

export const userQueue: UserQueue = new UserQueue();
