import { useQuery } from "@apollo/client";
import { GET_COMPANY_APPLICANT_LIST } from "./getCompanyApplicantList";
import {
  ApplicantListVariables,
  GetCompanyApplicantListResponse,
} from "@/types/applicant";

export const useApplicants = (variables: ApplicantListVariables) => {
  return useQuery<GetCompanyApplicantListResponse, ApplicantListVariables>(
    GET_COMPANY_APPLICANT_LIST,
    {
      variables,
      context: {
        headers: {
          "x-apollo-operation-name": "getCompanyApplicantList",
          "apollo-require-preflight": "true",
        },
      },
    }
  );
};
