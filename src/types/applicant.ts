export interface University {
  id: string;
  name: string;
  __typename: string;
}

export interface ApplicationAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  pageCount: number;
  uploadedAt: string;
  __typename: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string | null;
  __typename: string;
}

export interface JobListingCollaboratorResponse {
  autoAssignees: User[];
  __typename: string;
}

export interface JobListing {
  id: string;
  name: string;
  color: string;
  type: string;
  collaborators: JobListingCollaboratorResponse;
  __typename: string;
}

export interface JobListingStage {
  id: string;
  name: string;
  __typename: string;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string | null;
  email: string;
  __typename: string;
}

export interface RejectedReason {
  id: string;
  name: string;
  __typename: string;
}

export interface Application {
  id: string;
  createdAt: string;
  updatedAt: string;
  aiFit: number | null;
  score: number | null;
  salaryExp: number | null;
  salaryExpCurr: string | null;
  salaryExpPeriod: string | null;
  lexorank: string;
  resume: ApplicationAttachment | null;
  jobListing: JobListing;
  stage: JobListingStage;
  applicant: Applicant;
  rejectedReasons: RejectedReason[];
  __typename: string;
}

export interface ApplicantCollaboratorResponse {
  assignees: Array<{
    id: string;
    user: User;
    __typename: string;
  }>;
  autoAssignees: User[];
  __typename: string;
}

export interface Permission {
  id: string;
  canViewApplicantPhoneNumber: boolean;
  canViewApplicantLocation: boolean;
  canViewApplicantFormAnswers: boolean;
  canViewApplicantExpectedSalary: boolean;
  canDeleteApplicants: boolean;
  canAssignMembersToApplicants: boolean;
  __typename: string;
}

export interface Skill {
  id: string;
  name: string;
  color: string;
  __typename: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  __typename: string;
}

export interface ApplicantWithActiveApplication {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  isFavoritedByMe: boolean;
  profilePhotoUrl: string | null;
  __typename: string;
  collaborators: ApplicantCollaboratorResponse;
  activeApplication: Application;
  email: string;
  phoneNumber: string;
  address: string | null;
  latitude: number | null;
  age: number | null;
  longitude: number | null;
  country: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  gradUni: string | null;
  university: University | null;
  universityName: string | null;
  salaryExp: string | null;
  salaryExp2: number | null;
  salaryExpCurr: string | null;
  salaryExpPeriod: string | null;
  sourceLink: string;
  sourceType: string;
  sourceUpdatedAt: string;
  updatedAt: string;
  myPermission: Permission;
  createdAt: string;
  isViewedByMe: boolean;
  tags: Tag[];
  skills: Skill[];
}

export interface CompanyApplicantsResponse {
  applicants: ApplicantWithActiveApplication[];
  total: number;
  pages: number;
  __typename: string;
}

export interface GetCompanyApplicantListResponse {
  getCompanyApplicantList: CompanyApplicantsResponse;
}

export interface ApplicantListFilterParameter {
  name: string;
  operator: string;
  filterVariable: string;
  logicalOperator: string;
}

export interface ApplicantListFilter {
  filterParameters: ApplicantListFilterParameter[];
  query: string;
  isFavoriteApplicant: boolean;
  jobListingId: string | null;
}

export interface ApplicantListSort {
  createdAt: string;
}

export interface ApplicantListVariables {
  page: number;
  pageSize?: number | null;
  filter?: ApplicantListFilter | null;
  sort?: ApplicantListSort | null;
}
