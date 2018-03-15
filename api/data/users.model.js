var mongoose = require("mongoose");
mongoose.plugin(schema => { schema.options.usePushEach = true });

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model("User", userSchema);
