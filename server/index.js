const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

let CUSTOMERS = [
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
  },
  GetCustomer: (call, callback) => {
    const customer = CUSTOMERS.find((cust) => cust.id === call.request.id);

    if (customer) {
      callback(null, customer);
    } else {
      callback({ error: "customer not found" });
    }
  },
  AddCustomer: (call, callback) => {
    const newCustomer = call.request;

    CUSTOMERS.push(newCustomer);

    callback(null, newCustomer);
  },
  UpdateCustomer: (call, callback) => {
    const update = call.request;
    const updateIndex = CUSTOMERS.findIndex((cust) => cust.id === update.id);

    if (updateIndex !== -1) {
      CUSTOMERS[updateIndex] = update;
      callback(null, update);
    } else {
      callback({ error: "Customer to be updated not found" });
    }
  },
  DeleteCustomer: (call, callback) => {
    const deleteIndex = CUSTOMERS.findIndex(
      (cust) => cust.id === call.request.id
    );

    if (deleteIndex !== -1) {
      CUSTOMERS.splice(deleteIndex, 1);
      callback(null, {});
    } else {
      callback({ error: "Customer to be deleted not found" });
    }
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
