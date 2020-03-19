const definition = {
  columns: [
    { type: 'text', field: '79yfay', title: 'Name' },
    { type: 'text', field: '96afga', title: 'Category' },
    { type: 'boolean', field: 'horw34', title: 'Available', editable: true },
    {
      type: 'number',
      field: 'd9gg3s',
      title: 'Amount',
      editable: true,
      filter: 'filterDecimal',
    },
    {
      type: 'text',
      field: 'dag898',
      title: 'Value',
      editable: true,
      filter: 'filterCurrency',
    },
  ],
  columnGroups: [{ title: 'Items', span: 3 }, { title: 'Calcs', span: 2 }],
  sections: [
    {
      header: false,
      data: [
        ['Chainsaw', 'Tools', true, 1, '1,105 EUR'],
        ['Shovel', 'Gardening', true, 2, '15 EUR'],
      ],
    },
    {
      header: [{ title: 'Unavailable Products', span: 5 }],
      data: [
        ['Axe', 'Gardening', false, 1, '11 EUR'],
        ['Pike', 'Gardening', false, 1, '12 EUR'],
      ],
    },
  ],
}
