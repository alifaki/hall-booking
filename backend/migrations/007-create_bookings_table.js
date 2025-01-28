module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookings', {
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
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            booking_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            start_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            end_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('booked', 'cancelled', 'completed', 'pending'),
                defaultValue: 'booked',
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
        await queryInterface.dropTable('bookings');
    },
};