<?php

namespace ThirdParty\Tools;

/*
 * http://www.robpeck.com/2010/06/diffing-flattening-and-expanding-multidimensional-arrays-in-php/#.UwZ3O0JkG2B
*/

class Arrays
{
    /*
     * Flattens arrays that are multidimensional into a single dimensional array
     * 
    */
    public static function flatten($arr, $base = "", $divider_char = "_") 
    {
        $ret = array();
        if(is_array($arr)) 
        {
            foreach($arr as $k => $v) 
                {
                if(is_array($v)) {
                    $tmp_array = \PlayGigIt\Tools\Arrays::flatten($v, $base.$k.$divider_char, $divider_char);
                    $ret = array_merge($ret, $tmp_array);
                } 
                else 
                {
                    $ret[$base.$k] = $v;
                }
            }
        }
        return $ret;
    }

    /*
     * Takes a previously flatten array and makes it multidimensional again
     *
    */

    public static function inflate($arr, $divider_char = "_") {
        if(!is_array($arr)) {
            return false;
        }

        $split = '.' . preg_quote($divider_char, '_') . '_';

        $ret = array();

        foreach ($arr as $key => $val) 
        {
            $parts = preg_split($split, $key, -1, PREG_SPLIT_NO_EMPTY);
            $leafpart = array_pop($parts);
            $parent = &$ret;
            foreach ($parts as $part) 
            {
                if (!isset($parent[$part])) 
                {
                    $parent[$part] = array();
                } 
                elseif (!is_array($parent[$part])) 
                {
                    $parent[$part] = array();
                }
                $parent = &$parent[$part];
            }

            if (empty($parent[$leafpart])) 
            {
                $parent[$leafpart] = $val;
            }
        }
        return $ret;
    }

}
