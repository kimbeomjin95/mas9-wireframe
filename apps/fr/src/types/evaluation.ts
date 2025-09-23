export interface EvaluationScores {
  // DESLINE HOMEWORK (숙제/가정평가)
  homework: {
    combined: number; // 존중, 집안일, 숙제, 기타 통합 점수 (1-10점)
  };

  // ATTENDANCE (출석)
  attendance: {
    diligence: number; // 근면성실 (1-10점)
  };

  // DESLINE (인성)
  character: {
    gratitudeNotes: number; // 감사노트 (1-10점)
    leadership: number; // 리더십 (1-10점)
  };

  // PHYSICAL TEST (체력)
  physical: {
    squats: number; // 스쿼트 (1-10점)
    jumpingJacks: number; // 점핑잭 (1-10점)
  };

  // REQUIREMENT (기술요구사항)
  technical: {
    poomsae: number; // 품새 (1-10점)
    sparring: number; // 겨루기 (1-10점)
    kicks: number; // 발차기 (1-10점)
    breaking: number; // 격파 (1-10점)
  };
}

export interface EvaluationComments {
  homework: {
    combined?: string;
  };
  attendance: {
    diligence?: string;
  };
  character: {
    gratitudeNotes?: string;
    leadership?: string;
  };
  physical: {
    squats?: string;
    jumpingJacks?: string;
  };
  technical: {
    poomsae?: string;
    sparring?: string;
    kicks?: string;
    breaking?: string;
  };
  overall?: string; // 종합 코멘트
}

export interface StudentEvaluation {
  id: string;
  participantId: number;
  studentInfo: {
    fullName: string;
    avatar?: string;
    currentRank: string;
    targetRank: string;
    age?: number;
    gender?: string;
    attendanceCount: number;
    homeworkCount: number;
  };
  scores: EvaluationScores;
  comments: EvaluationComments;
  totalScore: number;
  grade: string; // A+, A, B+, B, C+, C, D, F
  passed: boolean;
  evaluatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EvaluationStatus = 'pending' | 'in_progress' | 'saved';

export interface EvaluationSession {
  id: string;
  testingEventId: string;
  selectedStudents: StudentEvaluation[];
  currentStudentId: string;
  evaluationStatuses: Record<string, EvaluationStatus>;
  completedCount: number;
}

// 레이더 차트용 데이터
export interface RadarChartData {
  품새: number;
  겨루기: number;
  체력: number;
  발차기: number;
  기타: number;
}

// 점수 계산 헬퍼 타입
export interface ScoreCalculation {
  totalScore: number;
  grade: string;
  passed: boolean;
  categoryAverages: {
    homework: number;
    attendance: number;
    character: number;
    physical: number;
    technical: number;
  };
  radarData: RadarChartData;
}
