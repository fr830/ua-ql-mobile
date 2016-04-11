// @flow

import rx, {Observable} from 'rx-lite';
import './UserAgent';
import io from 'socket.io-client/socket.io';


class SocketObservable {
  nextSocket: Function;
  constructor() {
  	const observable = new rx.ReplaySubject(1);
    this.nextSocket=()=> observable.where((s: any)=>s).take(1);
    const socket = io.connect('https://ua-ql.herokuapp.com/', {path: '/napi/socket.io', jsonp: false, transports: ['websocket']});
    socket.on('connect', ()=>observable.onNext(socket));    
    socket.on('connect_error', (error)=>console.log('error', JSON.stringify(error, null, '\t')));  
    socket.on('reconnect_attempt', ()=>observable.onNext(null));
  }
}

const socketListen = (socket: any) =>
{
  const data= new rx.ReplaySubject(1);
  socket.on('update', (msg: any)=> {
    data.onNext(msg);
  });
  return {socket, data};
  //socket.removeAllListeners("news");
};

const socketObserve= (socket: any, data: any, nodeId : string)=>{
  socket.emit('join', nodeId);
  return rx.Observable.create(subscribe=>{
    const sub = data
      .filter(n=> {
        return true;
      })
      .filter(n=>n.nodeId===nodeId)
    	.subscribe((x)=> {
        subscribe.onNext(x);
      });
    return ()=> {
      socket.emit('leave', nodeId);
      sub.dispose();
    }
  });
};

const socketObservable= new SocketObservable();

const observable = (nodeId : string)=>
	socketObservable
	  .nextSocket()
	  .filter(s=>s)
    .map(socketListen)
	  .map(({socket, data}) => socketObserve(socket, data, nodeId))
	  .switch();

export default observable;
