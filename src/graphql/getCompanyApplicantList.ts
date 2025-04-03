import { gql } from "@apollo/client";

export const GET_COMPANY_APPLICANT_LIST = gql`
  query getCompanyApplicantList(
    $page: Int!
    $pageSize: Int
    $filter: ApplicantListFilter
    $sort: ApplicantListSort
  ) {
    getCompanyApplicantList(
      page: $page
      pageSize: $pageSize
      filter: $filter
      sort: $sort
    ) {
      applicants {
        ...CoreTalentFragment
        email
        phoneNumber
        address
        latitude
        age
        longitude
        country
        gender
        dateOfBirth
        gradUni
        university {
          id
          name
          __typename
        }
        universityName
        salaryExp
        salaryExp2
        salaryExpCurr
        salaryExpPeriod
        sourceLink
        sourceType
        sourceUpdatedAt
        updatedAt
        myPermission {
          id
          canViewApplicantPhoneNumber
          canViewApplicantLocation
          canViewApplicantFormAnswers
          canViewApplicantExpectedSalary
          canDeleteApplicants
          canAssignMembersToApplicants
          __typename
        }
        createdAt
        isViewedByMe
        tags {
          id
          name
          color
          __typename
        }
        skills {
          id
          name
          color
          __typename
        }
        __typename
      }
      total
      pages
      __typename
    }
  }

  fragment CoreTalentFragment on ApplicantWithActiveApplication {
    ...CoreTalentFragmentWithoutLastApp
    collaborators {
      assignees {
        id
        user {
          id
          firstName
          lastName
          profilePictureUrl
          email
          __typename
        }
        __typename
      }
      autoAssignees {
        id
        firstName
        lastName
        phoneNumber
        email
        __typename
      }
      __typename
    }
    activeApplication {
      id
      createdAt
      updatedAt
      aiFit
      score
      salaryExp
      salaryExpCurr
      salaryExpPeriod
      lexorank
      resume {
        id
        name
        url
        size
        pageCount
        uploadedAt
        __typename
      }
      jobListing {
        id
        name
        color
        type
        collaborators {
          autoAssignees {
            id
            firstName
            lastName
            email
            profilePictureUrl
            __typename
          }
          __typename
        }
        __typename
      }
      stage {
        id
        name
        __typename
      }
      applicant {
        id
        firstName
        lastName
        profilePhotoUrl
        email
        __typename
      }
      rejectedReasons {
        id
        name
        __typename
      }
      __typename
    }
    __typename
  }

  fragment CoreTalentFragmentWithoutLastApp on ApplicantWithActiveApplication {
    id
    firstName
    lastName
    rating
    isFavoritedByMe
    profilePhotoUrl
    __typename
  }
`;
