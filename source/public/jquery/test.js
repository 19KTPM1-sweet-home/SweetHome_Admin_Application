// $.get("http://localhost:3000/properties", function (properties, status) {
//     properties.forEach((property, index) => {
//         if(index >= 3) {
//             const template = `<tr>
//                 <td>
//                     <div class="name-col">${property.name}</div>
//                 </td>
//                 <td>
//                     <div class="category-col">${property.category.name}</div>
//                 </td>
//                 <td>
//                     <div class="address-col">${property.address}</div>
//                 </td>
//                 <td>
//                     <div class="seller-col">${property.seller.name}</div>
//                 </td>
//                 <td>
//                     <div class="price-col">${property.price.toLocaleString()}</div>
//                 </td>
//                 <td>
//                     <div class="status-col">${property.status}</div>
//                 </td>
//                 <td>
//                     <div class="action-col">
//                         <a href="javascript:void()" class="mr-4" data-toggle="tooltip"
//                             data-placement="top" title="Edit"><i
//                                 class="fa fa-pencil color-muted"></i> </a>
//                         <a href="javascript:void()" data-toggle="tooltip"
//                             data-placement="top" title="Close"><i
//                                 class="fa fa-close color-danger"></i></a>
//                     </div>
//                 </td>
//             </tr>`;

//             $(".table-body").append(template);
//         }
//     });
//     $('.paging-wrapper').twbsPagination({
//       totalPages: 35,
//       visiblePages: 7,
//       onPageClick: function (event, page) {
//         $('#page-content').text('Page ' + page);
//       }
//     });
// });