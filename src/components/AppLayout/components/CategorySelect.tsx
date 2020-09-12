import { MenuItem } from '@material-ui/core';
import BaseTextField, {
  BaseTextFieldProps,
} from '@src/components/BaseTextField';
import Loading from '@src/components/Loading';
import { useGetCategoriesQuery } from '@src/generated/graphql';
import { GET_CATEGORIES } from '@src/gql/queries';
import React from 'react';

type CategorySelectProps = {
  name: BaseTextFieldProps['name'];
  required: BaseTextFieldProps['required'];
};

const CategorySelect = React.memo<CategorySelectProps>(function CategorySelect(
  props,
) {
  const { data, loading } = useGetCategoriesQuery({
    query: GET_CATEGORIES,
  });
  return (
    <BaseTextField
      {...props}
      select
      placeholder="Select Category"
      label="Category"
    >
      {loading ? (
        <Loading />
      ) : (
        data?.categories.map((category) => {
          return (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          );
        })
      )}
    </BaseTextField>
  );
});

export default CategorySelect;
