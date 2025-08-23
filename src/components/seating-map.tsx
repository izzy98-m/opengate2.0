import type { SeatingMapData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SeatingMapProps {
  data: SeatingMapData;
}

export default function SeatingMap({ data }: SeatingMapProps) {
  return (
    <TooltipProvider>
      <div className="bg-secondary/30 p-4 rounded-lg border">
        <div className="bg-muted w-full text-center py-2 rounded-t-lg mb-4 font-semibold text-muted-foreground">STAGE</div>
        <div className="space-y-2">
          {data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p className="text-xs font-semibold text-muted-foreground mb-1 text-center">{section.name}</p>
              <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
                {section.seats.map((seat) => (
                  <Tooltip key={seat.id} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'w-full aspect-square rounded-sm cursor-pointer transition-all duration-200',
                          seat.status === 'available' && 'bg-primary/20 hover:bg-primary hover:scale-110',
                          seat.status === 'taken' && 'bg-muted cursor-not-allowed',
                          seat.status === 'selected' && 'bg-accent ring-2 ring-accent-foreground'
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="capitalize">{seat.id} - {seat.status}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-primary/20"></div>Available</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-muted"></div>Taken</div>
        </div>
      </div>
    </TooltipProvider>
  );
}
