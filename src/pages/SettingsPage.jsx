import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "../constants/themes";
import { setTheme } from "../redux/reducers/theme_reducer";

const SettingPage = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="pt-5 px-5 flex-1">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-base-content">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose a theme for your chat interface
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-3">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`
                                    group flex flex-col items-center gap-1.5 p-2 rounded-lg cursor-pointer hover:bg-base-content/20
                                    ${theme === t ? "bg-base-content/20" : ""}
                                `}
            data-set-theme={t}
            onClick={() => dispatch(setTheme(t))}
          >
            <div
              className="relative h-12 w-full rounded-md overflow-hidden "
              data-theme={t}
            >
              <div className="grid grid-cols-4 gap-px p-1 h-full">
                <div className="rounded bg-primary h-full" />
                <div className="rounded bg-secondary h-full" />
                <div className="rounded bg-accent h-full" />
                <div className="rounded bg-neutral h-full" />
              </div>
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center text-base-content">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingPage;
