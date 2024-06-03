const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./protos/user.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const users = [];

server.addService(userProto.UserService.service, {
    getUsers: (call, callback) => {
        callback(null, { users: users });
    },
    addUser: (call, callback) => {
        const incomingUserRequest = call.request;
        users.push(incomingUserRequest);
        callback(null, incomingUserRequest);
    },
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("gRPC Server Started Successfully!!!");
    }
);
