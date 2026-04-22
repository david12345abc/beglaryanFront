// Универсальные схемы форм для CRUD админки.
// type: "text" | "textarea" | "number" | "checkbox" | "select" | "image" | "fk"

export const SCHEMAS = {
  blocks: {
    title: "Блоки",
    list: ["id", "page", "type", "order", "is_active", "title_hy"],
    fields: [
      { name: "page", label: "Страница (ID)", type: "fk", resource: "pages", optionLabel: (o) => `${o.slug} — ${o.title_hy || ""}` },
      {
        name: "type", label: "Тип", type: "select",
        options: [
          { value: "hero", label: "Hero" },
          { value: "about", label: "Текст с заголовком" },
          { value: "services", label: "Слайдер услуг" },
          { value: "news", label: "Новости" },
          { value: "reviews", label: "Отзывы" },
          { value: "contact_cta", label: "CTA" },
          { value: "text", label: "Текст" },
          { value: "image", label: "Изображение" },
        ],
      },
      { name: "order", label: "Порядок", type: "number" },
      { name: "is_active", label: "Активен", type: "checkbox" },
      { group: "Заголовок", fields: [
        { name: "title_hy", label: "HY", type: "text" },
        { name: "title_en", label: "EN", type: "text" },
        { name: "title_ru", label: "RU", type: "text" },
      ]},
      { group: "Подзаголовок", fields: [
        { name: "subtitle_hy", label: "HY", type: "text" },
        { name: "subtitle_en", label: "EN", type: "text" },
        { name: "subtitle_ru", label: "RU", type: "text" },
      ]},
      { group: "Текст", fields: [
        { name: "text_hy", label: "HY", type: "textarea" },
        { name: "text_en", label: "EN", type: "textarea" },
        { name: "text_ru", label: "RU", type: "textarea" },
      ]},
      { group: "Кнопка (текст)", fields: [
        { name: "button_text_hy", label: "HY", type: "text" },
        { name: "button_text_en", label: "EN", type: "text" },
        { name: "button_text_ru", label: "RU", type: "text" },
      ]},
      { name: "button_link", label: "Ссылка кнопки", type: "text" },
      { name: "image", label: "Изображение", type: "image" },
    ],
  },
  pages: {
    title: "Страницы",
    list: ["id", "slug", "title_hy", "is_active", "order"],
    fields: [
      { name: "slug", label: "Идентификатор", type: "text" },
      { group: "Заголовок", fields: [
        { name: "title_hy", label: "HY", type: "text" },
        { name: "title_en", label: "EN", type: "text" },
        { name: "title_ru", label: "RU", type: "text" },
      ]},
      { name: "order", label: "Порядок", type: "number" },
      { name: "is_active", label: "Активна", type: "checkbox" },
    ],
  },
  menu: {
    title: "Меню",
    list: ["id", "title_hy", "link", "order", "is_active"],
    fields: [
      { group: "Название", fields: [
        { name: "title_hy", label: "HY", type: "text" },
        { name: "title_en", label: "EN", type: "text" },
        { name: "title_ru", label: "RU", type: "text" },
      ]},
      { name: "link", label: "Ссылка", type: "text" },
      { name: "order", label: "Порядок", type: "number" },
      { name: "is_active", label: "Активен", type: "checkbox" },
    ],
  },
  services: {
    title: "Услуги",
    list: ["id", "title_hy", "order", "is_active"],
    fields: [
      { group: "Название", fields: [
        { name: "title_hy", label: "HY", type: "text" },
        { name: "title_en", label: "EN", type: "text" },
        { name: "title_ru", label: "RU", type: "text" },
      ]},
      { group: "Описание", fields: [
        { name: "description_hy", label: "HY", type: "textarea" },
        { name: "description_en", label: "EN", type: "textarea" },
        { name: "description_ru", label: "RU", type: "textarea" },
      ]},
      { name: "image", label: "Изображение", type: "image" },
      { name: "link", label: "Ссылка", type: "text" },
      { name: "order", label: "Порядок", type: "number" },
      { name: "is_active", label: "Активна", type: "checkbox" },
    ],
  },
  news: {
    title: "Новости",
    list: ["id", "title_hy", "order", "is_active"],
    fields: [
      { group: "Заголовок", fields: [
        { name: "title_hy", label: "HY", type: "text" },
        { name: "title_en", label: "EN", type: "text" },
        { name: "title_ru", label: "RU", type: "text" },
      ]},
      { group: "Контент", fields: [
        { name: "content_hy", label: "HY", type: "textarea" },
        { name: "content_en", label: "EN", type: "textarea" },
        { name: "content_ru", label: "RU", type: "textarea" },
      ]},
      { name: "image", label: "Изображение", type: "image" },
      { name: "order", label: "Порядок", type: "number" },
      { name: "is_active", label: "Опубликована", type: "checkbox" },
    ],
  },
  reviews: {
    title: "Отзывы",
    list: ["id", "author", "order", "is_active"],
    fields: [
      { name: "author", label: "Автор", type: "text" },
      { group: "Отзыв", fields: [
        { name: "text_hy", label: "HY", type: "textarea" },
        { name: "text_en", label: "EN", type: "textarea" },
        { name: "text_ru", label: "RU", type: "textarea" },
      ]},
      { name: "image", label: "Фото", type: "image" },
      { name: "order", label: "Порядок", type: "number" },
      { name: "is_active", label: "Активен", type: "checkbox" },
    ],
  },
  users: {
    title: "Пользователи",
    list: ["id", "username", "email", "role", "is_active"],
    fields: [
      { name: "username", label: "Логин", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "first_name", label: "Имя", type: "text" },
      { name: "last_name", label: "Фамилия", type: "text" },
      {
        name: "role", label: "Роль", type: "select",
        options: [
          { value: "admin", label: "Админ" },
          { value: "superadmin", label: "Суперадмин" },
        ],
      },
      { name: "password", label: "Пароль (пусто — не менять)", type: "text" },
      { name: "is_active", label: "Активен", type: "checkbox" },
    ],
  },
};
