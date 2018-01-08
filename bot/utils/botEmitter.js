import waterfall from 'promise-waterfall';
import EventEmitter from 'events';

class BotEmitter extends EventEmitter {

  constructor(){
    super(...arguments);
    this.emitSync = this.emitSync.bind(this);
    this.onSync = this.onSync.bind(this);
  }

  async emitSync(eventName, ...args){
      const listeners = this.listeners(eventName);

      if(listeners.length){
        try{
          await waterfall( listeners.map( listener => () => listener(...args)));
        }catch(e){
          throw new Error(e);
        }

        return true;
      }

      return false;
  }

  onSync(eventName, listener) {
      return this.on(eventName, (...args)=> (async()=> await listener(...args))() )
  }
}

export default BotEmitter;