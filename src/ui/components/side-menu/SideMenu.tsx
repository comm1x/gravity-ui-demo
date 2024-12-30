import { FC, ReactNode } from 'react';

import { AsideHeader, FooterItem } from '@gravity-ui/navigation';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes } from 'ui/components/app-router/AppRouter';
import { Figma } from 'ui/components/icons/Figma';
import { GitHub } from 'ui/components/icons/GitHub';
import { useSideMenuStore } from 'ui/components/side-menu/side-menu-store';

type Props = {
  children: ReactNode;
};

/**
 * Проверяет, соответствует ли указанный путь шаблону или является его подмаршрутом.
 *
 * @param templatePath - Шаблон пути, например, '/parent'.
 * @param currentPath - Путь, который проверяется, например, '/parent/child'.
 * @returns true, если currentPath совпадает с templatePath или начинается с него (как подмаршрут).
 *
 * @example
 * isMatchingPath('/parent', '/parent'); // true
 * isMatchingPath('/parent', '/parent/child'); // true
 * isMatchingPath('/parent', '/another'); // false
 */
const isMatchingPath = (templatePath: string, currentPath: string): boolean => {
  return currentPath === templatePath || currentPath.startsWith(`${templatePath}/`);
};

export const SideMenu: FC<Props> = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sideMenuState = useSideMenuStore();
  return (
    <AsideHeader
      compact={sideMenuState.compact}
      onChangeCompact={sideMenuState.setCompact}
      menuItems={[
        {
          id: AppRoutes.calls,
          current: isMatchingPath(AppRoutes.calls, pathname),
          onItemClick: () => navigate(AppRoutes.calls),
          title: 'Звонки',
          icon: () => <GitHub />,
        },
        {
          id: AppRoutes.searchRequests,
          current: isMatchingPath(AppRoutes.searchRequests, pathname),
          onItemClick: () => navigate(AppRoutes.searchRequests),
          title: 'Заявки',
        },
        {
          id: AppRoutes.gravitySample,
          current: isMatchingPath(AppRoutes.gravitySample, pathname),
          onItemClick: () => navigate(AppRoutes.gravitySample),
          title: 'Gravity UI Sample',
        },
      ]}
      headerDecoration={true}
      renderContent={() => props.children}
      renderFooter={() => {
        return (
          <FooterItem
            compact={sideMenuState.compact}
            item={{
              id: 'exit',
              onItemClick: () => navigate('/'),
              title: 'Выйти',
              icon: () => <Figma />,
            }}
          />
        );
      }}
    />
  );
};
