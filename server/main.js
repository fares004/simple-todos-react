import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import '/imports/api/tasksMethods';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksPublications';
const insertTask = (taskText, user) =>
    TasksCollection.insert({
        text: taskText,
        userId: user._id,
        createdAt: new Date(),
    });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
    ServiceConfiguration.configurations.upsert({ service: 'github' }, {
        $set: {
            loginStyle: 'popup',
            clientId: '', // insert your clientId here
            secret: '', // insert your secret here
        },
    });
    const user = Accounts.findUserByUsername(SEED_USERNAME);

    if (TasksCollection.find().count() === 0) {
        [
            'First Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task',
        ].forEach(taskText => insertTask(taskText, user));
    }
});