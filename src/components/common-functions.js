export const commonFunction = {
    convertSeconds: function(minutes){
        if(minutes){
            var seconds = minutes * 60;
            try{
                seconds = parseInt(seconds, 10);
                if(seconds > 86400){
                    var days = Math.floor(seconds/86400);
                    return days + ((days > 1) ? ' days' : ' day');
                }
                else if(seconds >= 3600){ 
                    var hours = Math.floor(seconds/3600);
                    return hours + ((hours > 1) ? ' hours' : ' hour');
                }
                else if(seconds >= 60){
                    var minutes = Math.floor(seconds/60)
                    return minutes + ((minutes > 1) ? ' minutes' : ' minute');
                }
                else return seconds + ((seconds > 1) ? ' secs' : ' sec');
            }
            catch(e){}
        }
        return 'N/A'
    },
}