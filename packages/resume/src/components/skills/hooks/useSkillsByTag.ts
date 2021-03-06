import { QueryFunctionContext, useQuery } from 'react-query';
import type { Skill, Tag } from 'types';
import { getJsonOrThrow } from './helpers';

type QueryKey = ['skills', Tag['id'] | undefined];

const fetchSkillByTag = ({
  queryKey: [, tag],
}: QueryFunctionContext<QueryKey>) => {
  if (!tag) {
    return;
  }
  const url = `/api/tags/${tag}/skills`;

  return fetch(url).then(getJsonOrThrow);
};

/**
 * Get all Skills by tag or all when none is specified
 *
 */
export default function useSkillsByTag(tag?: Tag) {
  const { data, ...query } = useQuery<
    Skill | undefined,
    unknown,
    Skill[],
    QueryKey
  >(['skills', tag?.id], fetchSkillByTag);

  return { skills: data, tag, ...query };
}
