server = require('./server');

if (process.env.NODE_ENV === "production") {
    server("client/build");
}
else {
    server(null);
}