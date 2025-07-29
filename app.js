const express = require('express');
require('dotenv').config();
const { sequelize, Course } = require('./models');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const coursesRouter = require('./routes/courses');
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/courses', coursesRouter);

// async function init() {
//     await sequelize.sync({ alter: true });
//     const names = ['Python', 'Java', 'C/Cpp', '.NET'];
//     for (const name of names) {
//         await Course.findOrCreate({ where: { name } });
//     }
// }
// init();

async function init() {
    try {
        console.log('🔄 Syncing database...');
        await sequelize.sync({ alter: true });

        console.log('📚 Seeding initial courses...');
        const names = ['Python', 'Java', 'C/Cpp', '.NET'];
        for (const name of names) {
            await Course.findOrCreate({ where: { name } });
        }

        console.log('✅ Database synced and seeded.');
    } catch (err) {
        console.error('❌ Error in init():', err);
        process.exit(1);
    }
}
init();



module.exports = app;
