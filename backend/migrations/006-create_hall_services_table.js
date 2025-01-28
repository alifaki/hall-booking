module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('hall_services', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            hall_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'halls',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            service_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            service_description: {
                type: Sequelize.TEXT,
                allowNull: true,
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

    async down(queryInterface) {
        await queryInterface.dropTable('hall_services');
    },
};