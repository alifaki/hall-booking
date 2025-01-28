module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('building_images', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            building_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'buildings',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            image_url: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('building_images');
    },
};