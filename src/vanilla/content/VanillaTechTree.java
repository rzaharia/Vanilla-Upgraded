package vanilla.content;

import arc.struct.Seq;
import mindustry.content.TechTree;
import mindustry.content.TechTree.TechNode;
import mindustry.ctype.ContentList;
import mindustry.ctype.UnlockableContent;
import mindustry.type.ItemStack;
import mindustry.content.*;
import mindustry.game.Objectives.*;

import static mindustry.content.Blocks.*;
import static mindustry.type.ItemStack.with;

import static vanilla.content.VanillaBlocks.*;

public class VanillaTechTree implements ContentList{
    private static TechNode context = null;

    @Override
    public void load(){
        attachNode(copperWallLarge, () -> {
            node(hugeCopperWall, () -> {
            	node(giganticCopperWall);
            });
        });

        attachNode(titaniumWallLarge, () -> {
        	node(hugeTitaniumWall, () -> {
            	node(giganticTitaniumWall);
            });

            node(mendingWall, () -> {
            	node(largeMendingWall, () -> {
            		node(hugeMendingWall, () -> {
            			node(giganticMendingWall);
            		});
            	});
            });
        });

        attachNode(plastaniumWallLarge, () -> {
        	node(hugePlastaniumWall, () -> {
            	node(giganticPlastaniumWall);
            });
        });

        attachNode(thoriumWallLarge, () -> {
        	node(hugeThoriumWall, () -> {
            	node(giganticThoriumWall);
            });

            node(obsidianWall, () -> {
            	node(largeObsidianWall, () -> {
            		node(hugeObsidianWall, () -> {
            			node(giganticObsidianWall);
            		});
            	});
            });
        });

        attachNode(phaseWallLarge, () -> {
        	node(hugePhaseWall, () -> {
            	node(giganticPhaseWall);
            });
        });

        attachNode(surgeWallLarge, () -> {
        	node(hugeSurgeWall, () -> {
            	node(giganticSurgeWall);
            });
        });

        attachNode(duo, () -> {
        	node(doum, () -> {
        		node(drim);
        	});
        });

      	attachNode(scatter, () -> {
        	node(diffraction, () -> {
        		node(division);
        	});
        });

        attachNode(lancer, () -> {
        	node(plasma, () -> {
        		node(quantum, () -> {
        			node(neutron);
        		});
        	});
        });

        attachNode(tetrativeReconstructor, () -> {
        	node(cvantiumReconstructor);
        });

        attachNode(payloadConveyor, () -> {
        	node(bigPayloadConveyor);

        	node(coveredPayloadConveyor, () -> {
        		node(bigCoveredPayloadConveyor);
        	});
        });

        attachNode(payloadRouter, () -> {
        	node(bigPayloadRouter);

        	node(coveredPayloadRouter, () -> {
        		node(bigCoveredPayloadRouter);
        	});
        });

        attachNode(titaniumConveyor, () -> {
        	node(coveredConveyor);
        });

        attachNode(pyratiteMixer, () -> {
            node(lithiumCompressor, () -> {
                node(tungsteneMelter);
            });
        });

        attachNode(Items.graphite, () -> {
        	nodeProduce(VanillaItems.lithium, () -> {
        		nodeProduce(VanillaItems.tungstene, () -> {
        			nodeProduce(VanillaItems.niobium, () -> {
        				nodeProduce(VanillaItems.oberald, () -> {
        					nodeProduce(VanillaItems.obsidian, () -> {

        					});

        					nodeProduce(VanillaItems.emerald, () -> {
        						
        					});
        				});
        			});
        		});
        	});
        });

        attachNode(Items.surgeAlloy, () -> {
        	nodeProduce(VanillaItems.resistantAlloy, () -> {
        		nodeProduce(VanillaItems.supraConductorAlloy, () -> {
        			nodeProduce(VanillaItems.vibro, () -> {

        			});
        		});
        	});
        });

        attachNode(Liquids.cryofluid, () -> {
            nodeProduce(VanillaLiquids.oberaldLiquid, () -> {

            });
        });

        attachNode(Liquids.slag, () -> {
            nodeProduce(VanillaLiquids.thoriumLiquid, () -> {

            });
        });
    }

    private static void attachNode(UnlockableContent parent, Runnable children){
        TechNode parnode = TechTree.all.find(t -> t.content == parent);
        context = parnode;
        children.run();
    }

    private static void node(UnlockableContent content, ItemStack[] requirements, Seq<Objective> objectives, Runnable children){
        TechNode node = new TechNode(context, content, requirements);
        if(objectives != null) node.objectives = objectives;
        TechNode prev = context;
        context = node;
        children.run();
        context = prev;
    }

    private static void node(UnlockableContent content, ItemStack[] requirements, Runnable children){
        node(content, requirements, null, children);
    }

    private static void node(UnlockableContent content, Seq<Objective> objectives, Runnable children){
        node(content, content.researchRequirements(), objectives, children);
    }

    private static void node(UnlockableContent content, Runnable children){
        node(content, content.researchRequirements(), children);
    }

    private static void node(UnlockableContent block){
        node(block, () -> {});
    }

    private static void nodeProduce(UnlockableContent content, Seq<Objective> objectives, Runnable children){
        node(content, content.researchRequirements(), objectives.and(new Produce(content)), children);
    }

    private static void nodeProduce(UnlockableContent content, Runnable children){
        nodeProduce(content, new Seq<>(), children);
    }
}