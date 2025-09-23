import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { COLORS } from '@mas9/shared-ui';
import ScoreSlider from './ScoreSlider';

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  icon,
  color,
  children,
}) => {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        border: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* 카테고리 헤더 */}
      <Box
        sx={{
          bgcolor: color,
          color: 'white',
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontSize: '16px', letterSpacing: '0.5px' }}
        >
          {title}
        </Typography>
      </Box>

      {/* 카테고리 내용 */}
      <CardContent sx={{ p: 3 }}>
        {children}
      </CardContent>
    </Card>
  );
};

// 개별 카테고리 컴포넌트들
interface HomeworkSectionProps {
  scores: {
    combined: number;
  };
  comments: {
    combined?: string;
  };
  onScoreChange: (field: string, value: number) => void;
  onCommentChange: (field: string, value: string) => void;
}

export const HomeworkSection: React.FC<HomeworkSectionProps> = ({
  scores,
  comments,
  onScoreChange,
  onCommentChange,
}) => (
  <CategorySection
    title="DESLINE HOMEWORK"
    icon={<span style={{ fontSize: '16px' }}>🏠</span>}
    color="#f59e0b"
  >
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ fontSize: '13px', mb: 2, fontStyle: 'italic' }}
    >
      존중, 집안일, 숙제, 기타를 종합적으로 평가해주세요
    </Typography>
    <ScoreSlider
      label="가정평가 (종합)"
      value={scores.combined}
      onChange={(value) => onScoreChange('combined', value)}
      comment={comments.combined}
      onCommentChange={(value) => onCommentChange('combined', value)}
      showComment={false}
    />
  </CategorySection>
);

interface AttendanceSectionProps {
  scores: {
    diligence: number;
  };
  comments: {
    diligence?: string;
  };
  attendanceCount: number;
  onScoreChange: (field: string, value: number) => void;
  onCommentChange: (field: string, value: string) => void;
}

export const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  scores,
  comments,
  attendanceCount,
  onScoreChange,
  onCommentChange,
}) => (
  <CategorySection
    title="ATTENDANCE"
    icon={<span style={{ fontSize: '16px' }}>📅</span>}
    color="#dc2626"
  >
    <Box sx={{ mb: 2, p: 2, bgcolor: '#fef2f2', borderRadius: 2, border: '1px solid #fecaca' }}>
      <Typography variant="body2" color="#991b1b" sx={{ fontSize: '13px' }}>
        📊 실제 출석 횟수: <strong>{attendanceCount}회</strong>
      </Typography>
    </Box>
    <ScoreSlider
      label="근면성실"
      value={scores.diligence}
      onChange={(value) => onScoreChange('diligence', value)}
      comment={comments.diligence}
      onCommentChange={(value) => onCommentChange('diligence', value)}
      showComment={false}
    />
  </CategorySection>
);

interface CharacterSectionProps {
  scores: {
    gratitudeNotes: number;
    leadership: number;
  };
  comments: {
    gratitudeNotes?: string;
    leadership?: string;
  };
  onScoreChange: (field: string, value: number) => void;
  onCommentChange: (field: string, value: string) => void;
}

export const CharacterSection: React.FC<CharacterSectionProps> = ({
  scores,
  comments,
  onScoreChange,
  onCommentChange,
}) => (
  <CategorySection
    title="DESLINE"
    icon={<span style={{ fontSize: '16px' }}>🧠</span>}
    color="#8b5cf6"
  >
    <ScoreSlider
      label="감사노트"
      value={scores.gratitudeNotes}
      onChange={(value) => onScoreChange('gratitudeNotes', value)}
      comment={comments.gratitudeNotes}
      onCommentChange={(value) => onCommentChange('gratitudeNotes', value)}
      showComment={false}
      customColor="#8b5cf6"
    />
    <Divider sx={{ my: 2 }} />
    <ScoreSlider
      label="리더십"
      value={scores.leadership}
      onChange={(value) => onScoreChange('leadership', value)}
      comment={comments.leadership}
      onCommentChange={(value) => onCommentChange('leadership', value)}
      showComment={false}
      customColor="#8b5cf6"
    />
  </CategorySection>
);

interface PhysicalSectionProps {
  scores: {
    squats: number;
    jumpingJacks: number;
  };
  comments: {
    squats?: string;
    jumpingJacks?: string;
  };
  onScoreChange: (field: string, value: number) => void;
  onCommentChange: (field: string, value: string) => void;
}

export const PhysicalSection: React.FC<PhysicalSectionProps> = ({
  scores,
  comments,
  onScoreChange,
  onCommentChange,
}) => (
  <CategorySection
    title="PHYSICAL TEST"
    icon={<span style={{ fontSize: '16px' }}>💪</span>}
    color="#10b981"
  >
    <ScoreSlider
      label="스쿼트"
      value={scores.squats}
      onChange={(value) => onScoreChange('squats', value)}
      comment={comments.squats}
      onCommentChange={(value) => onCommentChange('squats', value)}
      showComment={false}
    />
    <Divider sx={{ my: 2 }} />
    <ScoreSlider
      label="점핑잭"
      value={scores.jumpingJacks}
      onChange={(value) => onScoreChange('jumpingJacks', value)}
      comment={comments.jumpingJacks}
      onCommentChange={(value) => onCommentChange('jumpingJacks', value)}
      showComment={false}
    />
  </CategorySection>
);

interface TechnicalSectionProps {
  scores: {
    poomsae: number;
    sparring: number;
    kicks: number;
    breaking: number;
  };
  comments: {
    poomsae?: string;
    sparring?: string;
    kicks?: string;
    breaking?: string;
  };
  onScoreChange: (field: string, value: number) => void;
  onCommentChange: (field: string, value: string) => void;
}

export const TechnicalSection: React.FC<TechnicalSectionProps> = ({
  scores,
  comments,
  onScoreChange,
  onCommentChange,
}) => (
  <CategorySection
    title="REQUIREMENT"
    icon={<span style={{ fontSize: '16px' }}>🥋</span>}
    color="#3b82f6"
  >
    <ScoreSlider
      label="품새"
      value={scores.poomsae}
      onChange={(value) => onScoreChange('poomsae', value)}
      comment={comments.poomsae}
      onCommentChange={(value) => onCommentChange('poomsae', value)}
      showComment={false}
    />
    <Divider sx={{ my: 2 }} />
    <ScoreSlider
      label="겨루기"
      value={scores.sparring}
      onChange={(value) => onScoreChange('sparring', value)}
      comment={comments.sparring}
      onCommentChange={(value) => onCommentChange('sparring', value)}
      showComment={false}
    />
    <Divider sx={{ my: 2 }} />
    <ScoreSlider
      label="발차기"
      value={scores.kicks}
      onChange={(value) => onScoreChange('kicks', value)}
      comment={comments.kicks}
      onCommentChange={(value) => onCommentChange('kicks', value)}
      showComment={false}
    />
    <Divider sx={{ my: 2 }} />
    <ScoreSlider
      label="격파"
      value={scores.breaking}
      onChange={(value) => onScoreChange('breaking', value)}
      comment={comments.breaking}
      onCommentChange={(value) => onCommentChange('breaking', value)}
      showComment={false}
    />
  </CategorySection>
);

export default CategorySection;