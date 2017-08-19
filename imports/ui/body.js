import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
 
import './body.html';
import './task.js';
 

Template.body.onCreated( function bodyOncreadted() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if(instance.state.get('hideCompleted')){
        return Tasks.find({ 
              checked:{ $ne:true } 
            }, 
            { sort: { createdAt: -1} 
        });
    }
    return Tasks.find({}, { sort:{ createdAt: -1} });
  }
});

Template.body.events({
    'submit .new-task' (event) {
        event.preventDefault();

        const target = event.target;
        const text   = target.text.value;

        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        target.text.value = '';
    },

    'change .hide-completed input' (event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    }
});