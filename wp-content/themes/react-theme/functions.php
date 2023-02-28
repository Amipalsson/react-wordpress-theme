<?php
function ap_enqueue_scripts()
{

  $version = '1.1.0';
  if(defined('WP_DEBUG') && WP_DEBUG === true){
    $version = time();
  }

  wp_enqueue_script('theme', get_stylesheet_directory_uri() . '/dist/js/bundle.js', array('jquery'), $version, true);
  wp_enqueue_style('theme', get_stylesheet_directory_uri() . '/dist/css/style.bundle.css', array(), $version);
  wp_enqueue_style( 'theme', get_template_directory_uri().'/src/css/theme.css', array(), $version );

  $config = array(
    // TODO: Add any theme variables needed in react
    'rest_url' => rest_url(),
    'menu' => ap_get_menu('main-menu'),
  );
  wp_localize_script('theme', 'wp_config', $config);
}
add_action('wp_enqueue_scripts', 'ap_enqueue_scripts');

register_nav_menus(array(
  'main-menu' => 'Main Menu'
));

/**
 * Get WordPress menu by menu location
 * 
 * @return array
 */
function ap_get_menu($location)
{
    $output = [];
    $locations = get_nav_menu_locations();
    $menu = wp_get_nav_menu_object($locations[$location]);
    $menu_items = wp_get_nav_menu_items($menu);

    foreach ($menu_items as $item) {

        $data = [
            'ID' => $item->ID,
            'title' => $item->title,
            'url' => '/' . ap_strip_site_url($item->url),
            'parent' => intval($item->menu_item_parent),
        ];
        $output[] = $data;
    }

    return $output;
}

/**
 * Remove WordPress site url and trailing slash from url
 *
 * @param $url
 * @return string
 */
function ap_strip_site_url($url)
{
    $base_url = site_url();
    $url = trailingslashit($url);
    $url = substr($url, strlen($base_url) + 1);
    if (substr($url, -1) == '/') {
        $url = substr($url, 0, -1);
    }
    return $url;
}
