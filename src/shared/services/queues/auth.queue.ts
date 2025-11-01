import { IAuthJob } from "@auth/interfaces/auth.interface";
import { authWorker } from "@root/shared/workers/auth.worker";
import { BaseQueue } from "@services/queues/base.queue";


class AuthQueue extends BaseQueue{
  constructor(){
    super('auth queue');
    this.processJob('addAuthUserToDB',5, authWorker.addAuthUserToDB);
  }

  public addAuthUserJob (name: string, data: IAuthJob):void {

    this.addJob(name, data);

  }

}

export const authQueue: AuthQueue = new AuthQueue();
