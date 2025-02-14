// migrations/20231010123456-create-event-logs.js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('event_logs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Name of the referenced table
                    key: 'id', // Primary key in the referenced table
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            activity_description: {
                type: Sequelize.STRING(400),
                allowNull: false,
            },
            event_location: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            browser_used: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            ip_address: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            coordinate: {
                type: Sequelize.STRING(300),
                allowNull: true, // Nullable field
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('event_logs');
    },
};