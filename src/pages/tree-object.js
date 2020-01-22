export const nodes = [
  {
    id: 305,
    uuid: "e25a2614-63c3-4673-bfc6-9518a2d4fc53",
    parent: null,
    shared: false,
    name: "Demo Ltd",
    location: null,
    category: null,
    disabled: 1,
    users: "[2]",
    children: [
      {
        id: 306,
        uuid: "c1446710-126a-4af7-8fec-25f395a9db7f",
        parent: 305,
        shared: false,
        name: "Objekt A",
        location: "Prime",
        category: "Building",
        disabled: 1,
        users: "[2]",
        children: [
          {
            id: 308,
            uuid: "a3b7ab46-5ae8-40ab-863a-388cf5df0dce",
            parent: 306,
            shared: false,
            name: "Objekt A.1",
            location: "A",
            category: "_A",
            disabled: 1,
            users: "[2]"
          }
        ]
      },
      {
        id: 307,
        uuid: "9771724b-f617-4fd1-a3f1-718a6fbcc0cd",
        parent: 305,
        shared: false,
        name: "Testing object",
        location: "",
        category: "Tests",
        disabled: 1,
        users: "[2]"
      }
    ]
  },
  {
    id: 306,
    uuid: "c1446710-126a-4af7-8fec-25f395a9db7f",
    parent: 305,
    shared: false,
    name: "Objekt A",
    location: "Prime",
    category: "Building",
    disabled: 1,
    users: "[2]",
    children: [
      {
        id: 308,
        uuid: "a3b7ab46-5ae8-40ab-863a-388cf5df0dce",
        parent: 306,
        shared: false,
        name: "Objekt A.1",
        location: "A",
        category: "_A",
        disabled: 1,
        users: "[2]"
      }
    ]
  },
  {
    id: 308,
    uuid: "a3b7ab46-5ae8-40ab-863a-388cf5df0dce",
    parent: 306,
    shared: false,
    name: "Objekt A.1",
    location: "A",
    category: "_A",
    disabled: 1,
    users: "[2]"
  },
  {
    id: 307,
    uuid: "9771724b-f617-4fd1-a3f1-718a6fbcc0cd",
    parent: 305,
    shared: false,
    name: "Testing object",
    location: "",
    category: "Tests",
    disabled: 1,
    users: "[2]"
  }
];
