import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Тексты UI хранятся в БД (через API).
// Здесь — только служебные строки интерфейса (кнопки, плейсхолдеры, ошибки).

const resources = {
  hy: {
    translation: {
      menu: "ՄԵՆՅՈՒ",
      close: "Փակել",
      prev: "Նախորդ",
      next: "Հաջորդ",
      loading: "Բեռնվում է…",
      login: "Մուտք",
      username: "Օգտանուն",
      password: "Գաղտնաբառ",
      logout: "Ելք",
      admin_panel: "Ադմինի վահանակ",
      save: "Պահպանել",
      cancel: "Չեղարկել",
      add: "Ավելացնել",
      edit: "Խմբագրել",
      delete: "Ջնջել",
      confirm_delete: "Վստահ եք?",
      language: "Լեզու",
    },
  },
  en: {
    translation: {
      menu: "MENU",
      close: "Close",
      prev: "Previous",
      next: "Next",
      loading: "Loading…",
      login: "Login",
      username: "Username",
      password: "Password",
      logout: "Logout",
      admin_panel: "Admin panel",
      save: "Save",
      cancel: "Cancel",
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      confirm_delete: "Are you sure?",
      language: "Language",
    },
  },
  ru: {
    translation: {
      menu: "МЕНЮ",
      close: "Закрыть",
      prev: "Назад",
      next: "Далее",
      loading: "Загрузка…",
      login: "Войти",
      username: "Логин",
      password: "Пароль",
      logout: "Выйти",
      admin_panel: "Админ-панель",
      save: "Сохранить",
      cancel: "Отмена",
      add: "Добавить",
      edit: "Редактировать",
      delete: "Удалить",
      confirm_delete: "Вы уверены?",
      language: "Язык",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "hy",
    supportedLngs: ["hy", "en", "ru"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
