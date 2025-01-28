module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('halls', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            hall_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
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
            owner_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            amenities: {
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
        await queryInterface.dropTable('halls');
    },
};