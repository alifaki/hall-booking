module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('buildings', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            building_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
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
        await queryInterface.dropTable('buildings');
    },
};