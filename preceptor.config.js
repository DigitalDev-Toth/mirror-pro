module.exports = {

    "configuration": {
        "reportManager": {
            "reporter": [
                { "type": "Spec", "progress": false },
                { "type": "List", "progress": false },
                { "type": "Duration" }
            ]
        },
        "coverage": {
            "active": true,
            "path": "./coverage"
        }
    },
    "tasks": [
        {
            "type": "shell",
            "title": "cucumber-es2015",
            "configuration": {
                "cwd": __dirname,
                "cmd": "node ./node_modules/.bin/babel-node ./node_modules/.bin/cucumber-js ./test/features"
            }
        }
    ]
};