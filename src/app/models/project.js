const mongoose = require('../../database')

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task'
		}
	],
	color: {
		type: String,
		required: true
	},
	deleted: {
		type: Boolean,
		default: false,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
