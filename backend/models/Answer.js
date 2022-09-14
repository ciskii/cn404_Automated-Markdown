module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    answerObj: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    score: {
      type: DataTypes.FLOAT(5, 2),
      defaultValue: 0,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.Student);
    Answer.belongsTo(models.Quiz);
  };

  return Answer;
};
