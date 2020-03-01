const grpc = require('grpc');
const UpperCaseService = require('./interface');
const helloServiceImpl = require('./upperCaseService');
var ip = require('ip');

const server = new grpc.Server();

server.addService(UpperCaseService.service, helloServiceImpl);

server.bind(ip.address() + ':9090', grpc.ServerCredentials.createInsecure());

console.log('gRPC server running at http://' + ip.address() + ':9090');

server.start();