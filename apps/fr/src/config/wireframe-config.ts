export interface WireframeSection {
  id: number;
  title: string;
  description: string;
  component?: string;
  position?: {
    top: number;
    left: number;
  };
  highlight?: string;
}

export interface WireframePageContent {
  title: string;
  description: string;
  sections: WireframeSection[];
}

export const WIREFRAME_CONTENT: Record<string, WireframePageContent> = {
  accounts: {
    title: 'Accounts 페이지 설계서',
    description: '사용자 계정 관리 페이지로, 학교 멤버들의 정보를 조회하고 관리할 수 있습니다.',
    sections: [
      {
        id: 1,
        title: 'Header 영역',
        description: 'Accounts 페이지의 메인 헤더 영역입니다. 페이지 제목과 주요 액션 버튼들이 위치합니다.',
        component: 'PageHeader',
        position: { top: 20, left: 100 }
      },
      {
        id: 2,
        title: 'Export 버튼',
        description: '사용자 데이터를 외부 파일로 내보내기 위한 버튼입니다. Excel, CSV 등 다양한 형식을 지원합니다.',
        component: 'ExportButton',
        position: { top: 20, left: 200 }
      },
      {
        id: 3,
        title: 'Action 드롭다운',
        description: '선택된 사용자들에 대해 일괄 작업을 수행할 수 있는 드롭다운 메뉴입니다.',
        component: 'ActionDropdown',
        position: { top: 20, left: 300 }
      },
      {
        id: 4,
        title: 'Add member 버튼',
        description: '새로운 멤버를 시스템에 추가하기 위한 주요 액션 버튼입니다.',
        component: 'AddMemberButton',
        position: { top: 20, left: 400 }
      },
      {
        id: 5,
        title: '검색창',
        description: '멤버 이름으로 검색할 수 있는 검색 입력 필드입니다. 실시간 검색을 지원합니다.',
        component: 'SearchInput',
        position: { top: 120, left: 50 }
      },
      {
        id: 6,
        title: '필터 드롭다운들',
        description: 'Status, Membership, Tag, Rank, Expiration Date 등 다양한 조건으로 멤버를 필터링할 수 있습니다.',
        component: 'FilterDropdowns',
        position: { top: 160, left: 50 }
      },
      {
        id: 7,
        title: '활성 필터 태그',
        description: '현재 적용된 필터들을 태그 형태로 표시하며, 개별 제거가 가능합니다.',
        component: 'ActiveFilterTags',
        position: { top: 200, left: 50 }
      },
      {
        id: 8,
        title: 'Total 카운트',
        description: '현재 필터 조건에 맞는 멤버 수를 표시합니다.',
        component: 'TotalCount',
        position: { top: 240, left: 50 }
      },
      {
        id: 9,
        title: 'DataGrid 테이블',
        description: '멤버 목록을 테이블 형태로 표시합니다. 정렬, 선택, 페이징 기능을 제공합니다.',
        component: 'DataGrid',
        position: { top: 280, left: 50 }
      },
      {
        id: 10,
        title: 'Name 컬럼',
        description: '멤버의 아바타와 이름을 표시하는 컬럼입니다.',
        component: 'NameColumn',
        position: { top: 320, left: 100 }
      },
      {
        id: 11,
        title: 'Tag 컬럼',
        description: '멤버에게 할당된 태그들을 표시하는 컬럼입니다.',
        component: 'TagColumn',
        position: { top: 320, left: 200 }
      },
      {
        id: 12,
        title: 'Payment Info',
        description: '결제 정보 확인을 위한 아이콘 버튼입니다.',
        component: 'PaymentInfo',
        position: { top: 320, left: 500 }
      }
    ]
  },
  dashboard: {
    title: 'Dashboard 페이지 설계서',
    description: '전체적인 시스템 현황을 한눈에 볼 수 있는 대시보드 페이지입니다.',
    sections: [
      {
        id: 1,
        title: '통계 카드 영역',
        description: '주요 지표들을 카드 형태로 표시합니다.',
        component: 'StatsCards'
      }
    ]
  }
};

export const getWireframeContent = (pageId: string): WireframePageContent | null => {
  return WIREFRAME_CONTENT[pageId] || null;
};