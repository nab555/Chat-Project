import { IAuthJob } from "@auth/interfaces/auth.interface";
import { BaseQueue } from "@services/queues/base.queue";


class AuthQueue extends BaseQueue{
  constructor(){
    super('auth queue');
  }

  public addAuthUserJob (name: string, data: IAuthJob):void {

    this.addJob(name, data);

  }

}

export const authQueue: AuthQueue = new AuthQueue();
