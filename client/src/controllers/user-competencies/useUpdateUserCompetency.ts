import { CompetencyWithUserDto } from '@dto/competency';
import { UpdateUserCompetencyDto } from "@dto/userCompetency";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from 'notistack';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getUserCompetenciesListKey } from './keys';

export const useUpdateUserCompetency = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updateUserCompetencyDto: UpdateUserCompetencyDto) => axiosInstance.put(`/user-competencies/`, updateUserCompetencyDto),
    {
      onMutate: async ({ competencyId, status, userId }: UpdateUserCompetencyDto) => {
        await queryClient.cancelQueries(getUserCompetenciesListKey(userId))

        const previous = queryClient.getQueryData<CompetencyWithUserDto[]>(getUserCompetenciesListKey(userId))
 
        if (previous) {
          queryClient.setQueryData<CompetencyWithUserDto[]>(getUserCompetenciesListKey(userId), (
            previous.map((competency: CompetencyWithUserDto) => {
              if (competency.id === competencyId) {
                return {
                  ...competency,
                  userCompetencyInfo: {
                    ...competency.userCompetencyInfo,
                    status,
                  }
                }
              }
  
              return competency;
            })
          ))
        }
    
        return { previous }

      },
      onSuccess: () => {
        enqueueSnackbar(`Обновлено`, {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar(
          `Во время обновления прогресса произошла ошибка!`,
          {
            variant: 'error',
          }
        );
      },
      onSettled: (_, __, { userId }: UpdateUserCompetencyDto) => {
        queryClient.invalidateQueries(getUserCompetenciesListKey(userId));
      },
    }
  );

  return mutation;
}

