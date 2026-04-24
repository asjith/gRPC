const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const CUSTOMERS = [
  {
    id: "werwere",
    name: "John",
    age: 22
  },
  {
    id: "cdsvefsfv",
    name: "Ram",
    age: 30
  }
];

//for loading the proto file
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../customers.proto"),
  { keepCase: true, longs: String, enums: String, arrays: true }
);
const customersProto = grpc.loadPackageDefinition(packageDefinition);

//grpc server instance
const server = new grpc.Server();

//define the functions
server.addService(customersProto.CustomerService.service, {
  GetAllCustomers: (call, callback) => {
    callback(null, { customers: CUSTOMERS });
  }
});

//start the grpc server
server.bindAsync(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.log(error);
      return;
    }
    server.start();
  }
);
