module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('hall_images', {
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
        await queryInterface.dropTable('hall_images');
    },
};
