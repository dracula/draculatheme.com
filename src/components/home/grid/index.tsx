"use client";

import { LayoutGroup } from "framer-motion";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import {
  categoriesFiltersAtom,
  platformsFiltersAtom,
  searchAtom
} from "src/lib/atoms";
import categories from "src/lib/filters/categories";
import platforms from "src/lib/filters/platforms";
import App from "../app";

const renderApp = (app, index) => {
  return <App key={index} path={app} />;
};

const Grid = ({ paths }) => {
  const [platformsFilters] = useAtom(platformsFiltersAtom);
  const [categoriesFilters] = useAtom(categoriesFiltersAtom);
  const [search] = useAtom(searchAtom);

  const filterApps = useCallback(
    (app) => {
      const platformIndex = platformsFilters.indexOf(true);
      const categoryIndex = categoriesFilters.indexOf(true);
      const platformMatch =
        platformIndex !== -1
          ? platformIndex === 0 ||
            app.params.platform.includes(platforms[platformIndex].value) ||
            app.params.platform.includes("all")
          : true;
      const categoryMatch =
        categoryIndex !== -1
          ? categoryIndex === 0 ||
            app.params.categories.includes(categories[categoryIndex].value)
          : true;
      const searchMatch = search
        ? app.params.title.toLowerCase().includes(search.toLowerCase())
        : true;
      return platformMatch && categoryMatch && searchMatch;
    },
    [platformsFilters, categoriesFilters, search]
  );

  const filteredApps = useMemo(() => {
    const shouldFilter =
      platformsFilters.indexOf(true) > -1 ||
      categoriesFilters.indexOf(true) > -1;
    const apps = shouldFilter ? paths.filter(filterApps) : paths;
    return apps.map(renderApp);
  }, [paths, platformsFilters, categoriesFilters, search, filterApps]);

  return (
    <LayoutGroup>
      <ul className="apps-grid">{filteredApps}</ul>
    </LayoutGroup>
  );
};

export default Grid;
