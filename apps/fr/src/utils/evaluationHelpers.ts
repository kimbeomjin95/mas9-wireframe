import {
  EvaluationScores,
  RadarChartData,
  ScoreCalculation,
} from '../types/evaluation';

// API로 전송할 플랫 데이터 구조
export interface FlattenedScoreData {
  homeworkCombinedScore: number;
  attendanceDiligenceScore: number;
  characterGratitudeNotesScore: number;
  characterLeadershipScore: number;
  physicalSquatsScore: number;
  physicalJumpingJacksScore: number;
  technicalPoomsaeScore: number;
  technicalSparringScore: number;
  technicalKicksScore: number;
  technicalBreakingScore: number;
}

export const calculateTotalScore = (scores: EvaluationScores): number => {
  const homeworkTotal = scores.homework.combined;
  const attendanceTotal = scores.attendance.diligence;
  const characterTotal =
    scores.character.gratitudeNotes + scores.character.leadership;
  const physicalTotal = scores.physical.squats + scores.physical.jumpingJacks;
  const technicalTotal =
    scores.technical.poomsae +
    scores.technical.sparring +
    scores.technical.kicks +
    scores.technical.breaking;

  return (
    homeworkTotal +
    attendanceTotal +
    characterTotal +
    physicalTotal +
    technicalTotal
  );
};

export const calculateGrade = (totalScore: number): string => {
  if (totalScore >= 90) return 'A+';
  if (totalScore >= 85) return 'A';
  if (totalScore >= 80) return 'B+';
  if (totalScore >= 75) return 'B';
  if (totalScore >= 70) return 'C+';
  if (totalScore >= 65) return 'C';
  if (totalScore >= 60) return 'D';
  return 'F';
};

export const calculateCategoryAverages = (scores: EvaluationScores) => {
  return {
    homework: scores.homework.combined,
    attendance: scores.attendance.diligence,
    character:
      (scores.character.gratitudeNotes + scores.character.leadership) / 2,
    physical: (scores.physical.squats + scores.physical.jumpingJacks) / 2,
    technical:
      (scores.technical.poomsae +
        scores.technical.sparring +
        scores.technical.kicks +
        scores.technical.breaking) /
      4,
  };
};

export const calculateRadarData = (
  scores: EvaluationScores
): RadarChartData => {
  const categoryAvgs = calculateCategoryAverages(scores);

  return {
    품새: scores.technical.poomsae,
    겨루기: scores.technical.sparring,
    체력: categoryAvgs.physical,
    발차기: scores.technical.kicks,
    기타:
      (categoryAvgs.homework +
        categoryAvgs.attendance +
        categoryAvgs.character) /
      3,
  };
};

export const calculateEvaluation = (
  scores: EvaluationScores
): ScoreCalculation => {
  const totalScore = calculateTotalScore(scores);
  const grade = calculateGrade(totalScore);
  const passed = totalScore >= 70;
  const categoryAverages = calculateCategoryAverages(scores);
  const radarData = calculateRadarData(scores);

  return {
    totalScore,
    grade,
    passed,
    categoryAverages,
    radarData,
  };
};

export const getDefaultScores = (): EvaluationScores => ({
  homework: {
    combined: 0,
  },
  attendance: {
    diligence: 0,
  },
  character: {
    gratitudeNotes: 0,
    leadership: 0,
  },
  physical: {
    squats: 0,
    jumpingJacks: 0,
  },
  technical: {
    poomsae: 0,
    sparring: 0,
    kicks: 0,
    breaking: 0,
  },
});

// 평가 진행 상태를 판단하는 헬퍼 함수들
export const hasAnyScoreChanged = (scores: EvaluationScores): boolean => {
  return Object.keys(scores).some((categoryKey) => {
    const category = categoryKey as keyof EvaluationScores;
    return Object.keys(scores[category]).some((fieldKey) => {
      const field = fieldKey as keyof (typeof scores)[typeof category];
      const score = scores[category][field];
      return typeof score === 'number' && score > 0;
    });
  });
};

// 모든 점수가 입력되었는지 확인
export const areAllScoresEntered = (scores: EvaluationScores): boolean => {
  return Object.keys(scores).every((categoryKey) => {
    const category = categoryKey as keyof EvaluationScores;
    return Object.keys(scores[category]).every((fieldKey) => {
      const field = fieldKey as keyof (typeof scores)[typeof category];
      const score = scores[category][field];
      return typeof score === 'number' && score > 0;
    });
  });
};

// 평가가 저장 가능한 상태인지 확인 (모든 점수 입력 필요)
export const isEvaluationReadyToSave = (
  scores: EvaluationScores,
  comments?: any
): boolean => {
  // 모든 점수가 입력되었는지 확인
  return areAllScoresEntered(scores);
};

export const getEvaluationProgress = (scores: EvaluationScores): number => {
  const totalFields = Object.values(scores).reduce(
    (total, category) => total + Object.keys(category).length,
    0
  );

  const completedFields = Object.values(scores).reduce(
    (completed, category) =>
      completed +
      Object.values(category).filter(
        (score) => typeof score === 'number' && score >= 1
      ).length,
    0
  );

  return Math.round((completedFields / totalFields) * 100);
};

export const getScoreColor = (score: number): string => {
  if (score === 0) return '#9ca3af'; // gray for unrated
  if (score >= 8) return '#10b981'; // green
  if (score >= 6) return '#f59e0b'; // yellow
  if (score >= 4) return '#f97316'; // orange
  return '#ef4444'; // red
};

export const getGradeColor = (grade: string): string => {
  if (grade.startsWith('A')) return '#10b981';
  if (grade.startsWith('B')) return '#3b82f6';
  if (grade.startsWith('C')) return '#f59e0b';
  if (grade === 'D') return '#f97316';
  return '#ef4444';
};

// 중첩된 점수 구조를 1-depth API 형식으로 변환
export const flattenScoresForAPI = (scores: EvaluationScores): FlattenedScoreData => {
  return {
    homeworkCombinedScore: scores.homework.combined,
    attendanceDiligenceScore: scores.attendance.diligence,
    characterGratitudeNotesScore: scores.character.gratitudeNotes,
    characterLeadershipScore: scores.character.leadership,
    physicalSquatsScore: scores.physical.squats,
    physicalJumpingJacksScore: scores.physical.jumpingJacks,
    technicalPoomsaeScore: scores.technical.poomsae,
    technicalSparringScore: scores.technical.sparring,
    technicalKicksScore: scores.technical.kicks,
    technicalBreakingScore: scores.technical.breaking,
  };
};

// 1-depth API 형식을 중첩된 점수 구조로 변환
export const unflattenScoresFromAPI = (flatData: FlattenedScoreData): EvaluationScores => {
  return {
    homework: {
      combined: flatData.homeworkCombinedScore,
    },
    attendance: {
      diligence: flatData.attendanceDiligenceScore,
    },
    character: {
      gratitudeNotes: flatData.characterGratitudeNotesScore,
      leadership: flatData.characterLeadershipScore,
    },
    physical: {
      squats: flatData.physicalSquatsScore,
      jumpingJacks: flatData.physicalJumpingJacksScore,
    },
    technical: {
      poomsae: flatData.technicalPoomsaeScore,
      sparring: flatData.technicalSparringScore,
      kicks: flatData.technicalKicksScore,
      breaking: flatData.technicalBreakingScore,
    },
  };
};

// 플랫 데이터에서 모든 점수가 입력되었는지 확인
export const areAllFlatScoresEntered = (flatData: FlattenedScoreData): boolean => {
  return Object.values(flatData).every(score => typeof score === 'number' && score > 0);
};
