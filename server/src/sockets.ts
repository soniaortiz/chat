import { io, nsp } from './app';

export function sockets() {
    console.log('in server sockets: **********************************************************');
    nsp.on('connection', function(socket: any){
        console.log('someone connected');
        socket.on('a', (data: any) => {
            console.log('The data *****^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', data);
        });
      });
    
}
