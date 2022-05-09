import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { useAppAbility } from './abilityContext';
import { AppAbility } from './appAbility';

type PolicyCallback = (app: AppAbility) => boolean;
export const createPageGuard = (
  redirectUrl: string,
  ...policies: PolicyCallback[]
) =>
  function PageGuard<T>(Page: ComponentType<T>): ComponentType<T> {
    function NewPage(props: T) {
      const Router = useRouter();
      const ability = useAppAbility();
      const access = policies.every((p) => p(ability));
      if (access) {
        return <Page {...props} />;
      }

      Router.replace(redirectUrl);
      return null;
    }

    NewPage.displayName = Page.displayName;
    return NewPage;
  };
