$(function () {
	let $menuName = $('.js-select-name')

	$('html').click(function() {
		let $subMenu = $('.js-sub-menu')
		$subMenu.hide(); 
	});

	$('.js-select-containr').click(function(event){
		event.stopPropagation();
   	});

	$menuName.on('click', function() {
		let $subMenu = $(this).siblings('ul');
		$subMenu.toggle();
	})


    const $tabsLinksTitle = $('.tabs__link-title');
    const $tabsBlocksContent = $('.tabs__block-content');

    $tabsLinksTitle.each(function(index) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $tabsBlocksContent.removeClass('visible')
            $tabsLinksTitle.removeClass('tabs__link-title--active');
            $(this).addClass('tabs__link-title--active');
            $tabsBlocksContent.each(function (indexContent) {
                console.log({item:  $(this), indexContent});
                
                if (index === indexContent) {
                    $(this).addClass('visible')
                }
            })
        })
    })
})