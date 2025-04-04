import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetCompanyApplicantListResponse,
  ApplicantWithActiveApplication,
} from "@/types/applicant";
import { GET_COMPANY_APPLICANT_LIST } from "@/graphql/getCompanyApplicantList";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

interface ApplicantsState {
  applicants: ApplicantWithActiveApplication[];
  total: number;
  pages: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}

const initialState: ApplicantsState = {
  applicants: [],
  total: 0,
  pages: 0,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 30,
};

export const fetchApplicants = createAsyncThunk<
  GetCompanyApplicantListResponse,
  { page: number; pageSize: number },
  { extra: { client: ApolloClient<NormalizedCacheObject> } }
>("applicants/fetchAll", async (variables, { extra }) => {
  const { client } = extra;
  const response = await client.query<GetCompanyApplicantListResponse>({
    query: GET_COMPANY_APPLICANT_LIST,
    variables,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
});

const applicantsSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetApplicants: (state) => {
      state.applicants = [];
      state.total = 0;
      state.pages = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.pageSize = action.meta.arg.pageSize;
        if (action.meta.arg.page === 1) {
          state.applicants = action.payload.getCompanyApplicantList.applicants;
        } else {
          state.applicants = [
            ...state.applicants,
            ...action.payload.getCompanyApplicantList.applicants,
          ];
        }
        state.total = action.payload.getCompanyApplicantList.total;
        state.pages = action.payload.getCompanyApplicantList.pages;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch applicants";
      });
  },
});

export const { setPage, setPageSize, resetApplicants } =
  applicantsSlice.actions;
export default applicantsSlice.reducer;
