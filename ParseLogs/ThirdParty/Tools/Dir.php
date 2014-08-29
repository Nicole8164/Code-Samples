<?php

namespace Tools;

class Dir
{
    public static function read_dir ($dir,$exclude=array())
    {
        $files = array();
        $ffs = scandir($dir);
        foreach($ffs as $ff)
        {
            if(is_array($exclude) and !in_array($ff,$exclude))
            {
                if($ff != '.' && $ff != '..' && $ff != '.svn' && $ff != '.DS_Store' && substr ($ff, 0, 6) != '.~lock')
                {
                    if(!is_dir($dir.'/'.$ff))
                    {
                        $files[] = $dir . "/" . $ff;
                    }
                    if(is_dir($dir.'/'.$ff))
                    {
                        $f = \Tools\Dir::read_dir ($dir.'/'.$ff,$exclude);
                        foreach ($f as $f0)
                        {
                            $files[] = $f0;
                        }
                    }
                }
            }
        }
        return $files;
    }
}
