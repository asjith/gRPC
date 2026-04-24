const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

//for loading the proto file
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../customers.proto"),
  { keepCase: true, longs: String, enums: String, arrays: true }
);
const Service = grpc.loadPackageDefinition(packageDefinition).CustomerService;

const client = new Service(
  "127.0.0.1:30043",
  grpc.credentials.createInsecure()
);

module.exports = client;
